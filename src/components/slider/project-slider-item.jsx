import { Link } from "react-router-dom";

const ProjectSliderItem = ({ project }) => {
  const { imgURL, category, client } = project;

  return (
    <Link to="/" className="flex flex-col gap-4 w-full">
      <div>
        <img className="rounded-t-md" src={imgURL} alt={`${category} gig image`} />
      </div>

      <div className="flex items-center gap-3 py-3 px-5">
        <div>
          <img
            className="object-cover w-8 h-8 rounded-full"
            src={client.profileURL}
            alt="a freelancing client image"
          />
        </div>

        <div>
          <strong className="text-neutral-700 text-sm">Gig: {project.id}</strong>
          <p className="text-neutral-600 text-sm">{client.fullName}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectSliderItem;
