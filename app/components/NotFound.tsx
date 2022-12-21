import { Link } from "@remix-run/react";
import { ErrorPage } from "./errors";

export interface INotFoundProps {
	status?: number;
	data?: string;
	statusText?: string;
}

export function NotFound({ data, status, statusText }: INotFoundProps) {
	let error: Error = {
		message: data ?? "",
		name: status?.toString() ?? "",
		stack: statusText,
	};
	return (
		<>
			<ErrorPage
				title={`${status} - Oh no, you found a page that's missing stuff.`}
				subTitle={`${data}. So sorry.`}
				action={<Link to="/">Go home</Link>}
				error={error}
			/>
		</>
	);
}
