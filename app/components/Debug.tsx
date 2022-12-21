import { Grid } from "./Grid";

const IS_DEV = process.env.NODE_ENV === "development";

export const Debug = ({ message }: { message: string }) => {
	if (!IS_DEV) return null;
	return (
		<Grid as="h3" large>
			<i>{message}</i>
		</Grid>
	);
};
