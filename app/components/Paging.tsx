import type { ILinkButtonProps } from "./LinkButton";
import { LinkButton } from "./LinkButton";

export interface IPagingProps {
	currentPage: number;
	pageSize: number;
	itemsCount: number;
}

function Paging({ currentPage, itemsCount, pageSize }: IPagingProps) {
	const lastPage = Math.ceil(itemsCount / pageSize);
	return (
		<div className="flex items-center gap-2 pt-5">
			<PagingLink disabled={currentPage === 1} to={"1"}>
				{"<<"}
			</PagingLink>
			<PagingLink disabled={currentPage === 1} to={`${currentPage - 1}`}>
				{"<"}
			</PagingLink>
			<span>Page {currentPage}</span>
			<PagingLink disabled={currentPage === lastPage} to={`${currentPage + 1}`}>
				{">"}
			</PagingLink>
			<PagingLink disabled={currentPage === lastPage} to={`${lastPage}`}>
				{">>"}
			</PagingLink>
			<span className="flex items-center gap-1">
				Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, itemsCount)} of{" "}
				{itemsCount} products
			</span>
		</div>
	);
}

export interface IPagingLinkProps extends Omit<ILinkButtonProps, "className"> {}

function PagingLink({ to, children, ...rest }: IPagingLinkProps) {
	const productsRoutePrefix = "/products/";
	return (
		<LinkButton className={`rounded border p-1`} to={`${productsRoutePrefix}${to}`} {...rest}>
			{children}
		</LinkButton>
	);
}

export { Paging, PagingLink };
