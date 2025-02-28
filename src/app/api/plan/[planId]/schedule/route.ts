import { createClient } from "@/supabase/server";
import {
  AreaType,
  Order,
  SupabaseMemoType,
  SupabaseMoveType,
  SupabaseScheduleType,
} from "@/types/plan";
import { NextRequest, NextResponse } from "next/server";

const TABLE_NAME = "schedule";
const PLAN_TABLE_NAME = "plan";
const MOVE_TABLE_NAME = "moveSchedule";
const MEMO_TABLE_NAME = "memo";
const AREA_TABLE_NAME = "area";

type PlanData = {
  orderList: Order[][] | null;
};

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const {
      planId,
      title,
      place,
      memo,
      type,
      startTime,
      endTime,
      images,
      day,
      spend,
      checkList,
    } = await request.json();

    let insertData: any;
    let insertError: any;

    if (type === "move") {
      const { data, error } = await supabase
        .from(MOVE_TABLE_NAME)
        .insert([
          {
            planId,
            memo,
            startTime,
            endTime,
            type: title,
            imagesUrl: images,
          },
        ])
        .select();
      insertData = data;
      insertError = error;
    } else if (type === "memo") {
      const { data, error } = await supabase
        .from(MEMO_TABLE_NAME)
        .insert([
          {
            planId,
            title,
            content: memo,
            check: checkList,
          },
        ])
        .select();
      insertData = data;
      insertError = error;
    } else {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert([
          {
            planId,
            title,
            place,
            memo,
            type,
            startTime,
            endTime,
            imagesUrl: images,
            spend,
          },
        ])
        .select();
      insertData = data;
      insertError = error;
    }

    if (insertError) {
      console.error("Insert Error:", insertError);
      return NextResponse.json(
        {
          error: `[${insertError.code}] ${insertError.hint} > ${insertError.message}`,
        },
        { status: 400 }
      );
    }

    const insertedItem = insertData?.[0];
    const newEntry: Order = {
      type: type,
      id: insertedItem.id,
    };

    const { data: planData, error: planError } = await supabase
      .from(PLAN_TABLE_NAME)
      .select("orderList")
      .eq("id", planId)
      .single();

    if (planError) {
      console.error("Plan Retrieval Error:", planError);
      return NextResponse.json(
        {
          error: `[${planError.code}] ${planError.hint} > ${planError.message}`,
        },
        { status: 400 }
      );
    }

    const planDataParsed = planData as PlanData;
    let updatedOrderList: Order[][] = planDataParsed.orderList || [];

    while (updatedOrderList.length < day) {
      updatedOrderList.push([]);
    }

    updatedOrderList[day - 1].push(newEntry);

    const { error: updateError } = await supabase
      .from(PLAN_TABLE_NAME)
      .update({ orderList: updatedOrderList })
      .eq("id", planId);

    if (updateError) {
      console.error("Update Error:", updateError);
      return NextResponse.json(
        {
          error: `[${updateError.code}] ${updateError.hint} > ${updateError.message}`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: insertData }, { status: 200 });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

type GetParams = {
  params: { planId: string };
};

export async function GET(
  request: NextRequest,
  { params: { planId } }: GetParams
) {
  try {
    const supabase = createClient();
    const searchParams = request.nextUrl.searchParams;
    const day = parseInt(searchParams.get("day") || "1", 10);

    if (!planId) {
      console.error("Missing planId", searchParams, planId, day);
      return NextResponse.json({ error: "Missing planId" }, { status: 400 });
    }

    const { data: planData, error: planError } = await supabase
      .from(PLAN_TABLE_NAME)
      .select("orderList")
      .eq("id", planId)
      .single();

    if (planError) {
      console.error("Plan Retrieval Error:", planError);
      return NextResponse.json(
        {
          error: `[${planError.code}] ${planError.hint} > ${planError.message}`,
        },
        { status: 400 }
      );
    }

    const planDataParsed = planData as PlanData;

    const orderListForDay = planDataParsed.orderList?.[day - 1] || [];

    // Schedule 데이터
    const scheduleIds = orderListForDay
      .filter((entry) => entry.type === "customPlace" || entry.type === "place")
      .map((entry) => entry.id);
    const { data: scheduleData = [] } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .in("id", scheduleIds);

    // MoveSchedule 데이터
    const moveIds = orderListForDay
      .filter((entry) => entry.type === "move")
      .map((entry) => entry.id);
    const { data: moveData = [] } = await supabase
      .from(MOVE_TABLE_NAME)
      .select("*")
      .in("id", moveIds);

    // Memo 데이터
    const memoIds = orderListForDay
      .filter((entry) => entry.type === "memo")
      .map((entry) => entry.id);
    const { data: memoData = [] } = await supabase
      .from(MEMO_TABLE_NAME)
      .select("*")
      .in("id", memoIds);

    // Area 데이터
    const areaIds = (scheduleData || [])
      .filter((entry) => entry.type === "place" && entry.areaId !== undefined)
      .map((entry) => entry.areaId!);

    const { data: areaData = [] } = await supabase
      .from(AREA_TABLE_NAME)
      .select("*")
      .in("id", areaIds);

    // 결과 데이터 결합
    const resultData = orderListForDay.map((entry) => {
      if (entry.type === "customPlace" || entry.type === "place") {
        const data = scheduleData?.find((d) => d.id === entry.id) as
          | SupabaseScheduleType
          | undefined;

        if (data && data.type === "place") {
          data.data.area = areaData?.find((a) => a.id === data.data.areaId) as
            | AreaType
            | undefined;
        }
        return { ...entry, data };
      } else if (entry.type === "move") {
        return {
          ...entry,
          data: moveData?.find((d) => d.id === entry.id) as
            | SupabaseMoveType
            | undefined,
        };
      } else if (entry.type === "memo") {
        return {
          ...entry,
          data: memoData?.find((d) => d.id === entry.id) as
            | SupabaseMemoType
            | undefined,
        };
      }
      return entry;
    });

    return NextResponse.json({ data: resultData }, { status: 200 });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
