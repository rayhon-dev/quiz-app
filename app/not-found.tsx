import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-extrabold text-[var(--color-text)]">
        Sahifa topilmadi
      </h1>
      <p className="mt-2 text-[var(--color-muted)]">
        So&apos;ralgan sahifa mavjud emas
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)]"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
