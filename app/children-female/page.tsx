import ModelPageLayout from "@/components/ModelPageLayout";
import { childrenFemaleModels } from "@/lib/models-data";

export default function ChildrenFemalePage() {
    return (
        <ModelPageLayout
            title="Children"
            category="children"
            subcategory="female"
            models={childrenFemaleModels}
        />
    );
}
