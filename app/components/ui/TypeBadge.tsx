type Props = {
    color: string;
    name: string;
    maxWidth?: string;
};

export const TypeBadge = ({ color, name, maxWidth = '100px' }: Props) => {
    return (
        <span
            className="text-xs px-2 py-0.5 rounded-full shrink-0 truncate block"
            style={{
                backgroundColor: `${color}20`,
                color,
                maxWidth,
            }}
            title={name}
        >
            {name}
        </span>
    );
};
