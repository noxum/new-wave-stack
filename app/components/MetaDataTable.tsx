export interface ITableData {
	caption: string;
	value: string;
}

export interface IMetaDataTableProps {
	data: ITableData[];
}

export function MetaDataTable({ data }: IMetaDataTableProps) {
	return (
		<div className="w-full overflow-hidden overflow-x-auto">
			<table className="w-full table-fixed border-collapse border-none bg-white text-sm">
				<tbody>
					{data.map((pDetails) => {
						return (
							<tr className="duration-200 ease-in hover:bg-slate-100" key={pDetails.caption}>
								<td className="w-96 border-b border-neutral-300 p-2 align-top text-neutral-500">{`${pDetails.caption}:`}</td>
								<td className="border-b border-neutral-300 p-2 align-top text-neutral-500">
									{pDetails.value}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
