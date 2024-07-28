import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
  
  export function Alert({
    isOpen,
    onOpenChange,
    title = "Are you absolutely sure?",
    description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
    cancelText = "Cancel",
    actionText = "Continue",
    onAction = () => {},
    onCancel = () => {},
  }) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
            <AlertDialogAction onClick={onAction}>{actionText}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  