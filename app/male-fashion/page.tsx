import ModelPageLayout from "@/components/ModelPageLayout";
import { maleFashionModels } from "@/lib/models-data";

export default function MaleFashionPage() {
    return (
        <ModelPageLayout
            title="Male Models"
            category="male"
            subcategory="fashion"
            models={maleFashionModels}
        />
    );
}
