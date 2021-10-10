import AbbNav from "../../Components/AppNav";
import { Switch, Route } from "react-router-dom";
import RegisterClient from "../RegisterClient/RegisterClient.page";
import RegisterCompany from "../RegisterCompany/RegisterCompany.page";
import Packs from "../Packs/Packs.page";
import AddProduct from "../AddProduct/AddProduct.page";

const Home = () => {
  return (
    <>
      <AbbNav />
      <Switch>
        <Route path="/add-client" component={RegisterClient} />
        <Route path="/add-company" component={RegisterCompany} />
        <Route path="/add-product" component={AddProduct} />
        <Route component={Packs} />
      </Switch>
    </>
  );
};

export default Home;
