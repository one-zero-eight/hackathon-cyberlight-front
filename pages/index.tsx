import cyberbaseImg from "@/assets/cyberbase.webp";
import Layout from "@/components/Layout";
import { Button, Container } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <Layout>
      <Container>
        <section className="relative mt-8 pt-[60px]">
          <Image
            src={cyberbaseImg}
            alt="Кибер.База"
            className="absolute right-0 top-0 h-[350px] w-auto"
          />
          <h1 className="mb-2 text-5xl font-bold text-black dark:text-white ">
            Кибер.База
          </h1>
          <h2 className="text-xl text-gray-600">Учись, играй, защищай!</h2>
          <Link href="/register">
            <Button className="mt-6">Пройти бесплатный чекап</Button>
          </Link>
        </section>
      </Container>
    </Layout>
  );
}
