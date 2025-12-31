import ModelPageLayout from "@/components/ModelPageLayout";
import { childrenMaleModels } from "@/lib/models-data";

export default function ChildrenMalePage() {
    return (
        <ModelPageLayout
            title="Children"
            category="children"
            subcategory="male"
            models={childrenMaleModels}
        />
    );
}
