import { IconWeight } from "@phosphor-icons/react";

export interface ProfileButtonProps {
  mainName: string;
  profilePicture?: string;
  onClick?: () => void;
  style: object;
  weight: IconWeight;
}