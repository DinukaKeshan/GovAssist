import CitizenHome from "./home/CitizenHome";
import MinisterHome from "./home/MinisterHome";
import AgentHome from "./home/AgentHome";
import PublicHome from "./home/PublicHome";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <PublicHome />;

  switch (user.role) {
    case "CITIZEN":
      return <CitizenHome />;
    case "MINISTER":
      return <MinisterHome />;
    case "AGENT":
      return <AgentHome />;
    default:
      return <PublicHome />;
  }
}
