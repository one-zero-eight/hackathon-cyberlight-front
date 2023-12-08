import { Container } from "@mantine/core";

export default function Footer() {
  return (
    <footer className="py-4">
      <Container>
        <p className="text-center text-gray-700">
          Все права защищены &copy; {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  );
}
