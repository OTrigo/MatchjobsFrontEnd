export type AvailableIcons = "longArrow";

type IconProps = {
  id: string;
  strokeWidth?: number;
  size?: number;
  width?: number;
  height?: number;
};

const CustomIcon = ({
  id,
  strokeWidth = 16,
  size = 32,
  width = 32,
  height = 32,
  ...otherProps
}: IconProps) => {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={`assets/sprites.svg#${id}`} />
    </svg>
  );
};

export default CustomIcon;
