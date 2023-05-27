import { ProfileButtonProps } from "../../types/components/profileButton";
import { Container } from "./styles";
import Image from "next/image";
import { User } from "@phosphor-icons/react";

export default function ProfileButton({ profilePicture, mainName, onClick, style, weight }: ProfileButtonProps) {
  return (
    <Container onClick={onClick} style={style}>
      {
        profilePicture ?
          <div style={{ backgroundImage: `url('${profilePicture}')` }} className="image" />
          :
          <User size='70%' weight={weight} color='#999999' />
      }
    </Container>
  )
}