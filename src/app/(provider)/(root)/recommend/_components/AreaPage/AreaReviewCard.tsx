import { api } from "@/apis/api";
import RatingIcons from "@/components/Card/RatingIcons";
import ReviewDropdownMenu from "@/components/DropdownMenu/ReviewDropdownMenu";
import { useAuth } from "@/contexts/auth.contexts";
import { AreaReview } from "@/types/Recommend";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { createEditBottomSheet } from "../BottomSheet/EditBottomSheet";
import VanilaImgFrame from "../VanilaImgFram";

// props로 유저정보, 리뷰정보를 받아야함.
type AreaReviewCardProps = {
  name: string;
  createdAt: string;
  userImageUrl: string | null;
  imageUrl: string;
  rating: number;
  description: string;
  reviewInfo: AreaReview;
};

const AreaReviewCard = React.memo(
  ({
    name,
    createdAt,
    userImageUrl,
    imageUrl,
    rating = 0,
    description,
    reviewInfo,
  }: AreaReviewCardProps) => {
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const { isLoggedIn } = useAuth();
    const date = createdAt.slice(0, 10).replaceAll("-", ".");
    const queryClient = useQueryClient();

    const handleOpen = () => {
      setBottomSheetVisible(true);
    };

    const handleClose = () => {
      setBottomSheetVisible(false);
    };
    const BottomSheet = createEditBottomSheet();
    const { mutate: deleteReview } = useMutation({
      mutationFn: async ({ id, areaId }: { id: number; areaId: number }) => {
        await api.review.deleteReview({ id, areaId });
      },
      onError: (error) => {
        console.error("Error adding data:", error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["areaReviews"] });
        queryClient.invalidateQueries({
          queryKey: ["area", reviewInfo.areaId],
        });
      },
    });
    const handleDelete = async (id: number) => {
      try {
        deleteReview({ id, areaId: reviewInfo.areaId! });
      } catch (error) {
        console.error("error deleting data", error);
      }
    };
    return (
      <section className="w-full md:w-[311px] md:h-[340px] flex flex-col px-4 md:px-0">
        {isBottomSheetVisible && (
          <BottomSheet
            areaName={reviewInfo.areaName}
            onClose={handleClose}
            reviewInfo={reviewInfo}
          />
        )}
        <article className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <VanilaImgFrame
              imageUrl={
                userImageUrl !== "undefined"
                  ? userImageUrl!
                  : "/icons/avatar.svg"
              }
              alt="icon"
              width="w-11"
              height="h-11"
              frameClassName="bg-white rounded-full relative aspect-auto"
              imageClassName="rounded-full object-contain"
            />

            <div className="flex flex-col justify-center gap-y-1 pl-4 relation">
              <h1 className="text-sm font-bold">{name}</h1>
              <p className="text-xs font-semibold">{date}</p>
            </div>
          </div>

          {isLoggedIn && (
            <ReviewDropdownMenu
              handleOpen={handleOpen}
              handleDelete={() => handleDelete(reviewInfo.id)}
            />
          )}
        </article>
        <div className="mt-7">
          <RatingIcons type="small" rating={rating} />
        </div>
        <p className="w-full mt-3 h-[72px] text-xs text-ellipsis line-clamp-3 ">
          {description}
        </p>
        {imageUrl && (
          <VanilaImgFrame
            imageUrl={
              !imageUrl || imageUrl === "" ? "/defaultImage.webp" : imageUrl!
            }
            alt="reviewImg"
            width="w-full"
            height="h-[220px] "
            frameClassName="relative aspect-auto mt-3 mb-12 md:mb-0 hover:cursor-pointer "
            imageClassName="object-cover rounded-lg "
          />
        )}
      </section>
    );
  }
);

AreaReviewCard.displayName = "AreaReviewCard";

export default AreaReviewCard;
