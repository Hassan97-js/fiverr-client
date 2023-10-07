import { Link } from "react-router-dom";

const CategorySliderItem = ({ item }) => {
  const styles = {
    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(${item.imgURL})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  return (
    <Link style={styles} className="flex relative text-white h-96 w-full" to="/gigs">
      <div className="pt-7 pl-7">
        <p className="font-thin">{item.description}</p>
        <p className="text-2xl font-medium">{item.title}</p>
      </div>
    </Link>
  );
};

export default CategorySliderItem;
