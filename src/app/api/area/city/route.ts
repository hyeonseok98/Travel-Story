import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const limit = searchParams.get("limit");
  if (!id) {
    return NextResponse.json({
      status: 400,
      message: "Bad Request",
      error: { status: 400, message: "Bad Request" },
      data: null,
    });
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("area")
    .select("*")
    .eq("cityId", id)
    .order("type");

  const groupedData = data?.reduce(
    (acc, curr) => {
      if (curr.type !== null && curr.type !== undefined) {
        acc[curr.type] = acc[curr.type] || [];
        // limit이 null이거나 undefined인 경우, 제한 없이 데이터를 추가합니다.
        if (
          limit === null ||
          limit === undefined ||
          acc[curr.type].length < Number(limit)
        ) {
          acc[curr.type].push(curr);
        }
      }
      return acc;
    },
    {} as Record<string, any[]>
  );

  if (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: { status: 500, message: "Internal Server Error" },
      data: null,
    });
  }

  if (!data || data.length === 0) {
    return NextResponse.json({
      status: 404,
      message: "No Data",
      error: { status: 404, message: "No Data" },
      data: null,
    });
  }

  return NextResponse.json({
    status: 200,
    message: "Success",
    data: groupedData,
    error: null,
  });
}
