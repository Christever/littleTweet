import { Avatar } from "primereact/avatar";

export default function AvatarUser({ pseudo, avatarUrl, small }) {
  const initials = pseudo ? pseudo.slice(0, 2).toUpperCase() : "??";

  return (
    <>
      <Avatar
        shape="circle"
        label={!avatarUrl ? initials : null}
        image={avatarUrl}
        className={
        small
          ? "w-6 h-6 text-xs bg-teal-600 text-white"
          : "w-10 h-10 text-sm bg-teal-600 text-white"
      }
      />
    </>
  );
}
