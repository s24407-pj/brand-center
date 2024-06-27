import {SignOutButton} from './SignOutButton'

export default function DropdownProfileMenu({profileImage}: any) {
	return (
		<div className="dropdown dropdown-end dropdown-bottom">
			<div tabIndex={0} role="button" className="btn btn-circle btn-ghost m-1">
				<div className="avatar w-8">
					<div className="rounded-full">
						<img src={profileImage} />
					</div>
				</div>
			</div>
			<div className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
				<ul tabIndex={0}>
					<li>
						<a>Profile</a>
					</li>
					<li>
						<a>Settings</a>
					</li>
				</ul>
				<div className="divider m-0"></div>
				<SignOutButton />
			</div>
		</div>
	)
}
