import ModelPageLayout from "@/components/ModelPageLayout";
import { femaleClassicModels } from "@/lib/models-data";

export default function FemaleClassicPage() {
    return (
        <ModelPageLayout
            title="Female Models"
            category="female"
            subcategory="classic"
            models={femaleClassicModels}
        />
    );
}
