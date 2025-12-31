import ModelPageLayout from "@/components/ModelPageLayout";
import { childrenTweenModels } from "@/lib/models-data";

export default function ChildrenTweenPage() {
    return (
        <ModelPageLayout
            title="Children"
            category="children"
            subcategory="tween"
            models={childrenTweenModels}
        />
    );
}
