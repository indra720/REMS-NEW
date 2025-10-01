import { cn } from "@/lib/utils";

interface PropertyCardProps {
  image: string;
  className?: string;
  style?: React.CSSProperties;
}

const PropertyCard = ({ image, className, style }: PropertyCardProps) => {
  return (
    <div
      className={cn(
        "absolute rounded-2xl overflow-hidden opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-105 hover:-translate-y-2",
        "shadow-floating backdrop-blur-sm border border-white/20",
        className
      )}
      style={{ boxShadow: "var(--shadow-floating)", ...style }}
    >
      <div className="w-40 h-32 md:w-48 md:h-36 lg:w-56 lg:h-40">
        <img
          src={image}
          alt="Property"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default PropertyCard;