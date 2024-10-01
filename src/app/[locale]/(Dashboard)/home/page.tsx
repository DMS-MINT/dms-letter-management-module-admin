import { AuthRequiredError } from "@/lib/exceptions/AuthError";

const session = null;
const page = () => {
	if (!session) throw new AuthRequiredError();
	return <div>page</div>;
};

export default page;
