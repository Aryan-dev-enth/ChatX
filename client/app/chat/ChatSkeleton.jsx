import { Skeleton } from "@/components/ui/skeleton";

const ChatSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-start space-x-2">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>

      <div className="flex items-start justify-end space-x-2">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>

      <div className="flex items-start space-x-2">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>

      <div className="flex items-start justify-end space-x-2">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>

      <div className="flex items-start space-x-2">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
      <div className="flex items-start justify-end space-x-2">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>

      <div className="flex items-start space-x-2">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
      <div className="flex items-start justify-end space-x-2">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>

      <div className="flex items-start space-x-2">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
    </div>
  );
};

export default ChatSkeleton;
