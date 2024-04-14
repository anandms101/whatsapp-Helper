import { ModeToggle } from "@/components/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Link } from "@radix-ui/react-navigation-menu";
import { MessageCircleMore, WindIcon } from "lucide-react";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import DrawerComponent from "./Drawer";

export default function NavBar() {
  return (
    <>
      {/* for sm screens */}
      <DrawerComponent />

      {/* for md+ screens */}
      <NavigationMenu className="invisible flex flex-grow flex-row max-w-full justify-between px-52 md:visible">
        <NavigationMenuList>
          <NavigationMenuItem className="flex text-lg font-appName font-semibold">
            quickWhisper <WindIcon />{" "}
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem className="flex p-1 pr-4">
            <Link
              href="https://web.whatsapp.com/"
              target="_blank"
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={`${navigationMenuTriggerStyle()}`}>
                WhatsApp
                <MessageCircleMore className="pl-1" />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
