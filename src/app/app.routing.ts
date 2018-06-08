import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { TradewindComponent } from './tradewind/tradewind.component'
import { AppComponent } from './app.component';
import { MicroblogComponent } from './microblog/microblog.component';


export const AppRoutes: Routes = [
    { path: '', component: MicroblogComponent },
    { path: 'microblog', component: MicroblogComponent },
    { path: 'tradewind', component: TradewindComponent },
    { path: '**', component: MicroblogComponent }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
// /export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes, {useHash: true});