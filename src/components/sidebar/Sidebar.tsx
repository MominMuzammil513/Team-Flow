import { OptionSidebar } from "./option-sidebar/OptionSidebar"
import ShortcutSidebar from "./shortcut-sidebar/ShortcutSidebar"


const Sidebar = () => {
    return (
        <aside className="fixed top-0 left-0 md:static h-full flex overflow-hidden">
            <ShortcutSidebar/>
            <OptionSidebar/>
        </aside>
    )
}
export default Sidebar