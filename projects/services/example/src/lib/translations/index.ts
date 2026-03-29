import { InlineLoader, Translation } from '@jsverse/transloco';

type ExampleLocale = 'pt-BR' | 'en-US' | 'es-ES';

type TranslationModule = Translation | { default: Translation };

type TranslationImporter = () => Promise<TranslationModule>;

const translationImporters: Record<ExampleLocale, TranslationImporter> = {
    'pt-BR': () => import('./pt-BR.json'),
    'en-US': () => import('./en-US.json'),
    'es-ES': () => import('./es-ES.json'),
};

const loadTranslation = (lang: ExampleLocale): Promise<Translation> =>
    translationImporters[lang]().then(
        (module) => (module as { default?: Translation }).default ?? (module as Translation),
    );

export const exampleTranslationLoader: InlineLoader = Object.fromEntries(
    (Object.keys(translationImporters) as ExampleLocale[]).map((lang) => [
        lang,
        () => loadTranslation(lang),
    ]),
) as InlineLoader;
