import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import AuthProviders from "./AuthProviders";

const Navbar = () => {
  const session = {}

	return (
		<nav className="flexBetween navbar">
			<div className="flex-1 flexStart gap-10">
				<Link href="/">
					<Image
						src="/mainLogo.svg"
						width={116}
						height={43}
						alt="logo"
					/>
				</Link>
				<ul className="xl:flex hidden text-small gap-7">
					{NavLinks.map((link) => (
						<Link
							href={link.href}
							key={link.text}
						>
							{link.text}
						</Link>
					))}
				</ul>
			</div>

			<div className="flexCenter gap-4">
				{session ? (
					<>
						{/* <ProfileMenu /> */}

						<Link href="/create-project">
							<Button title="Share work" />
						</Link>

						<Link href="/profile/6637c3c83fb71dbe918a81f6">
							<Button title="My Profile" />
						</Link>
					</>
				) : (
					<AuthProviders />
				)}
			</div>
		</nav>
	);
};

export default Navbar;
