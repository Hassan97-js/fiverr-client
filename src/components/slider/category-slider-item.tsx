import { Link } from "react-router-dom";

type TProps = {
  category: {
    id: number;
    title: string;
    description: string;
    image: string;
  };
};

const CategorySliderItem = ({ category }: TProps) => {
  const styles = {
    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(${category.image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  return (
    <Link style={styles} className="flex relative text-white h-96 w-full" to="/gigs">
      <div className="pt-7 pl-7">
        <p className="font-thin">{category.description}</p>
        <p className="text-2xl font-medium">{category.title}</p>
      </div>
    </Link>
  );
};

export default CategorySliderItem;
