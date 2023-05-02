import { menuItems } from "../../../project.config"
import { Navbar, Banner } from "../components"

export const HomePage = () => {
  return (
    <>
      <Banner />
      <Navbar items={menuItems} />
    </>
  )
}
