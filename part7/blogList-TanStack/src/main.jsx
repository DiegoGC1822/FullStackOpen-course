import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { BlogsProvider } from './context/BlogsContext';
import { UsersProvider } from './context/UsersContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<UsersProvider>
			<BlogsProvider>
				<NotificationProvider>
					<AuthProvider>
						<BrowserRouter>
							<App />
						</BrowserRouter>
					</AuthProvider>
				</NotificationProvider>
			</BlogsProvider>
		</UsersProvider>
	</QueryClientProvider>
);
