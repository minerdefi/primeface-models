import ModelPageLayout from "@/components/ModelPageLayout";
import { maleCommercialModels } from "@/lib/models-data";

export default function MaleCommercialPage() {
    return (
        <ModelPageLayout
            title="Male Models"
            category="male"
            subcategory="commercial"
            models={maleCommercialModels}
        />
    );
}
