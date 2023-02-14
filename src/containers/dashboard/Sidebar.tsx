import clsx from "clsx";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { useRef, useContext } from "react";
import { useSingleState } from "../../hooks/useSingleState";
import { LogoutContext } from "../../context/LogoutContext";

export const DashboardSidebar = ({ items }: { items: SideItem[] }) => {
  const logout: any = useContext(LogoutContext);
  const collapsed = useSingleState(false);
  const hovered = useSingleState(false);
  const throttledHover = useRef(false);
  const isExpanded = hovered.get || !collapsed.get;
  const isCollapsed = !isExpanded;

  return (
    <aside
      className={clsx(
        "h-full flex transition-[width,padding] duration-300 flex-col overflow-y-hidden overflow-x-hidden bg-white relative",
        isExpanded ? "w-64" : "w-[70px]"
      )}
    >
      <div
        className={clsx(
          " py-8 transition-[padding]",
          isCollapsed ? "" : "px-4 w-64"
        )}
      >
        <img
          src={isCollapsed ? "/images/pc-icon-logo.svg" : "/images/pc-logo.svg"}
          className={clsx(
            isCollapsed ? "w-[72px]" : "w-[120px]",
            "transition-[width] h-[36px] "
          )}
          alt="_logo"
        />
      </div>
      <nav
        id="Sidebar-nav"
        onMouseEnter={() => {
          throttledHover.current = true;
          setTimeout(() => {
            if (throttledHover.current) {
              hovered.set(true);
            }
          }, 400);
        }}
        onMouseLeave={() => {
          hovered.set(false);
          throttledHover.current = false;
        }}
        className={clsx(
          isCollapsed ? "w-full" : "w-full",
          "flex-1 overflow-y-hidden hover:overflow-y-auto  custom-scrollbar"
        )}
      >
        {items.map((item) => (
          <SidebarItem
            collapsed={isCollapsed}
            key={item.name}
            item={item}
            offset={30}
          />
        ))}

        <div className="absolute w-full bottom-[8rem] h-16 pl-8 gap-3.5 bg-white block items-center">
          <div className="w-full flex cursor-pointer items-center gap-3.5 mb-4">
            <img
              src={`/icons/sidebar/get-help.svg`}
              className={clsx("h-6 w-6")}
              alt="log_out"
            />

            <span
              className={`whitespace-nowrap text-[#83879B] ${
                isCollapsed ? "hidden" : ""
              }`}
            >
              Get Help
            </span>
          </div>
          <div className="w-full flex cursor-pointer items-center gap-3.5">
            <img
              src={`/icons/sidebar/settings.svg`}
              className={clsx("h-6 w-6")}
              alt="log_out"
            />

            <span
              className={`whitespace-nowrap text-[#83879B] ${
                isCollapsed ? "hidden" : ""
              }`}
            >
              Settings
            </span>
          </div>

         
        </div>
      </nav>
    </aside>
  );
};

export interface SideItem {
  name: string;
  path: string;
  iconName?: string;
  children?: SideItem[];
}

export const SidebarItem = ({
  item,
  collapsed,
  offset,
  depth = 0,
}: {
  item: SideItem;
  collapsed: boolean;
  offset: number;
  depth?: number;
}) => {
  let resolved = useResolvedPath(item.path);
  //depth less than 1 and you have children and your children have icons
  const shouldBeExact =
    depth < 1 &&
    (item.children?.length ?? 0) > 1 &&
    (item.children ?? []).some((i) => !!i.iconName);
  let match = useMatch({ path: resolved.pathname, end: false });
  offset = collapsed ? 0 : offset;
  return (
    <>
      <NavLink
        key={item.path + item.name}
        to={item.path ?? "/"}
        end={shouldBeExact}
        className={({ isActive }) =>
          clsx(
            "w-full flex items-center  text-sm",
            collapsed ? "pl-6 gap-5" : "px-8 gap-3.5",
            isActive
              ? " text-black bg-[#FAFAFA] w-3/4 rounded font-semibold"
              : "text-[#83879B]",
            item.iconName ? " h-14 " : "h-7"
          )
        }
        style={{
          paddingLeft: `${offset * depth + (collapsed ? 24 : 32)}px`,
        }}
      >
        {({ isActive }) => (
          <>
            {item.iconName && (
              <img
                src={`/icons/sidebar/${item.iconName}.svg`}
                className={clsx(
                  "h-6 w-6",
                  isActive ? "" : "invert-[55%] brightness-0"
                )}
                alt="sidebar-icon"
              />
            )}
            {!item.iconName && collapsed && (
              <span
                className={clsx(
                  "h-6 w-6  rounded-full flex-shrink-0",
                  isActive ? "bg-fara-blue/80" : "bg-fara-blue/20"
                )}
              />
            )}
            <span className={`whitespace-nowrap ${collapsed && "hidden"}`}>
              {item.name}
            </span>
            {((item.children && item.children.length > 0) || false) && (
              <span className={clsx("!ml-auto", !match && "!mr-1")}>
                <ChevronUpIcon
                  className={clsx(
                    "h-5 w-5 transition-transform ",
                    match ? "" : "rotate-180"
                  )}
                />
              </span>
            )}
          </>
        )}
      </NavLink>
      {match && item.children && item.children.length > 0 && (
        <div className="flex gap-2 mt-2 mb-1 flex-col text-sm">
          {item.children.map((c, index) => (
            <SidebarItem
              item={c}
              collapsed={collapsed}
              key={item.path + index + c.path}
              depth={depth + 1}
              offset={offset}
            />
          ))}
        </div>
      )}
    </>
  );
};
