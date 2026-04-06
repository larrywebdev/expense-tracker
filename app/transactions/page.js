import { getData } from "../../lib/data-service";
import UserTableClient from "./UserTableClient";
export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto pb-5">
      <UserTableClient data={data} />
    </div>
  );
}
