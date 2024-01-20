type TProps = {
  image?: string;
  name?: string;
  email?: string;
};

export const ChatAvatar = ({ image, name, email }: TProps) => {
  return (
    <div className="flex items-center gap-[0.625rem]">
      <div className="rounded-full w-12 h-12 overflow-hidden min-w-[3rem]">
        <img className="w-full h-full overflow-hidden object-cover object-center" src={image} alt="" />
      </div>
      <div>
        <p className="capitalize font-semibold text-base">{name}</p>
        <p className="lowercase font-medium text-sm text-zinc-500/90">{email}</p>
      </div>
    </div>
  );
};
