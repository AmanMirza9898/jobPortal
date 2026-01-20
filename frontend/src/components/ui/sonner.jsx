import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      position="top-center"
      closeButton={true} // Ye wo chhota wala cross icon rakhega
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <TriangleAlertIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: "justify-center",
          title: "text-center w-full",
        },
      }}
      style={{
        "--normal-bg": "white)",
        "--normal-text": "black",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)",
        cursor: "pointer",
      }}
      {...props}
    />
  );
};

export { Toaster };
