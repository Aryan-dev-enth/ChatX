import Landing from "@/components/landing/Landing";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <div className='w-full h-full bg-background'>
            <Navbar />
      <Landing />
    </div>
  );
}
