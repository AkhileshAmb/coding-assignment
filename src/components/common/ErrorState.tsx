import { Link } from "react-router-dom";

interface Props {
  username: string;
}

export function ErrorState({
  username,
}: Props) {

  return (
    <div className="text-center">

      <p className="text-[var(--text-h)] mb-4">
        Could not load profile details for {username}
      </p>

      <Link
        to="/"
        className="text-[var(--accent)] text-sm underline"
      >
        Back to search
      </Link>

    </div>
  );
}