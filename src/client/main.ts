import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import 'core-js/es/reflect'
import 'core-js/features/reflect'
import 'core-js/stable/reflect'
import { AppModule } from './app/app.module'

platformBrowserDynamic().bootstrapModule(AppModule)
