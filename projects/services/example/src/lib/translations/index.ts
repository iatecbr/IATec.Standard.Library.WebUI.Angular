import { InlineLoader, Translation } from '@jsverse/transloco';

type ExampleCoreLocale = 'pt-BR' | 'en-US' | 'es-ES';

type TranslationModule = Translation | { default: Translation };

type TranslationImporter = () => Promise<TranslationModule>;

const translationImporters: Record<ExampleCoreLocale, TranslationImporter> = {
    'pt-BR': () => import('./pt-BR.json'),
    'en-US': () => import('./en-US.json'),
    'es-ES': () => import('./es-ES.json'),
};

const loadTranslation = (lang: ExampleCoreLocale): Promise<Translation> =>
    translationImporters[lang]().then(
        (module) => (module as { default?: Translation }).default ?? (module as Translation),
    );

export const exampleCoreTranslationLoader: InlineLoader = Object.fromEntries(
    (Object.keys(translationImporters) as ExampleCoreLocale[]).map((lang) => [
        lang,
        () => loadTranslation(lang),
    ]),
) as InlineLoader;
