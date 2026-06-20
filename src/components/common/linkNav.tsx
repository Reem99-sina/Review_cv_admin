import { clsx } from "clsx";
import Link from "next/link";
type props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};
export function LinkNav({ href, className, children }: props) {
  return (
    <Link href={href} className={clsx("hover:text-text-custom transition",className)} >
      {children}
    </Link>
  );
}
