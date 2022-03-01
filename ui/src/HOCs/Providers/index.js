import UserProvider from "./User.provider";
import ThemeProvider from "./Theme.provider";
import CacheProvider from "./Cache.provider";

const Providers = {
  User: UserProvider,
  Theme: ThemeProvider,
  Cache: CacheProvider,
};

export default Providers;
export { UserProvider, ThemeProvider, CacheProvider };
