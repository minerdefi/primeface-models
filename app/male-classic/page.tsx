import ModelPageLayout from "@/components/ModelPageLayout";
import { maleClassicModels } from "@/lib/models-data";

export default function MaleClassicPage() {
    return (
        <ModelPageLayout
            title="Male Models"
            category="male"
            subcategory="classic"
            models={maleClassicModels}
        />
    );
}
