import LandingPageFooter from "./components/LandingPageFooter";
import LandingPageHeader from "./components/LandingPageHeader";
import LandingPageHero from "./components/LandingPageHero";
import { getCookies } from "@/actions/authServerActions";

export default async function Home() {
  const currentUser = await getCookies();

  return (
    <div className="flex h-full flex-col">
      <LandingPageHeader currentUser={currentUser} />
      <LandingPageHero />
      <LandingPageFooter />
    </div>
  );
}