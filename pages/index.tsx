import Image from "next/image";
import Link from "next/link";
import { Button, Container } from "@mantine/core";
import Layout from "@/components/Layout";

import cyberbaseImg from "@/assets/cyberbase.webp";

export default function Page() {
  return (
    <Layout>
      <Container>
        <section className="relative mt-8 pt-[60px]">
          <Image
            src={cyberbaseImg}
            alt="Кибер.База"
            className="absolute right-0 top-0 h-[300px] w-auto"
          />
          <h1 className="mb-2 text-5xl font-bold text-black dark:text-white ">
            Кибер.База
          </h1>
          <h2 className="text-xl text-gray-600">
            Преврати свои навыки в киберщит.
          </h2>
          <Link href="/checkup">
            <Button className="mt-6">Пройти чекап</Button>
          </Link>
        </section>
      </Container>
    </Layout>
  );
}
