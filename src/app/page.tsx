import Image from "next/image";
import ColombiaClock from "@/components/colombia-clock";

export default function Home() {
  return (
    <main className="landing">
      <Image src="/bro-garage.jpg" alt="Piloto sobre una Aprilia RSV4 Factory en Bro Garage" fill preload sizes="100vw" className="landing-photo" />
      <div className="photo-shade" aria-hidden="true" />
      <section className="announcement" aria-labelledby="coming-soon">
        <h1 id="coming-soon"><span>Muy pronto</span><strong>Bro Garage</strong><span>será web!</span></h1>
        <div className="accent" aria-hidden="true" />
        <ColombiaClock />
      </section>
    </main>
  );
}
