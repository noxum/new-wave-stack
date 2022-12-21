import type { IParallaxModule, NovaDbObject } from "~/api/api.types";
import { Grid } from "./Grid";
import { Module } from "./Module";

export interface IModuleGroupProps {
	modules: NovaDbObject[];
}

interface IModuleGroup {
	type: "default" | "parallax";
	modules: NovaDbObject[];
}

function ModuleGroup({ modules }: IModuleGroupProps) {
	const moduleMap = new Map<number, IModuleGroup>();
	moduleMap.set(0, { type: "default", modules: [] });
	let index = 0;
	for (const module of modules) {
		const hasOpenGroup = moduleMap.has(index - 1);
		let currentGroup: IModuleGroup = hasOpenGroup
			? (moduleMap.get(index - 1) as IModuleGroup)
			: (moduleMap.get(0) as IModuleGroup);

		if (module.meta.type !== "parallaxImageModule") {
			if (currentGroup.type === "parallax") {
				moduleMap.set(index, { type: "default", modules: [module] });
				index++;
			} else {
				currentGroup.modules.push(module);
			}
		} else {
			// We always create a new group for parallax modules
			moduleMap.set(index, { type: "parallax", modules: [module] });
			index++;
		}
	}

	return (
		<>
			{[...moduleMap.keys()].map((mKey, index) => {
				const moduleGroup = moduleMap.get(mKey);
				if (!moduleGroup) return null;
				if (moduleGroup.type === "parallax") {
					const parallaxModule = moduleGroup.modules[0] as IParallaxModule
					return (
						<Module key={parallaxModule.meta.id} type={parallaxModule.meta.type} module={parallaxModule} />
					);
				} else
					return (
						<Grid key={`${moduleGroup.type}_${index}`} container contentRow nested>
							{moduleGroup.modules.map((defaultModule) => {
								return (
									<Module
										key={defaultModule.meta.id}
										type={defaultModule.meta.type}
										module={defaultModule}
									/>
								);
							})}
						</Grid>
					);
			})}
		</>
	);
}

export { ModuleGroup };
