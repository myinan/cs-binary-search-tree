# How to install Linux on Windows with WSL

Developers can access the power of both Windows and Linux at the same time on a Windows machine. The Windows Subsystem for Linux (WSL) lets developers install a Linux distribution (such as Ubuntu, OpenSUSE, Kali, Debian, Arch Linux, etc) and use Linux applications, utilities, and Bash command-line tools directly on Windows, unmodified, without the overhead of a traditional virtual machine or dualboot setup.

## Prerequisites
You must be running Windows 10 version 2004 and higher (Build 19041 and higher) or Windows 11 to use the commands below. If you are on earlier versions, you need to manually install WSL.

## Install WSL command
You can now install everything you need to run WSL with a single command. Open PowerShell or Windows Command Prompt in administrator mode by right-clicking and selecting "Run as administrator", enter the `wsl --install` command, then restart your machine.

This command will enable the features necessary to run WSL and install the Ubuntu distribution of Linux.

By default, the installed Linux distribution will be Ubuntu. This can be changed using the -d flag.

Once you have installed WSL, you will need to create a user account and password for your newly installed Linux distribution.

You can list your installed Linux distributions and check the version of WSL each is set to by entering the command: `wsl -l -v` in PowerShell or Windows Command Prompt.

New Linux installations, installed using the wsl --install command, will be set to WSL 2 by default.


## Manual installation steps for older versions of WSL


### Step 1 - Enable the Windows Subsystem for Linux
You must first enable the "Windows Subsystem for Linux" optional feature before installing any Linux distributions on Windows.

Open PowerShell as Administrator (Start menu > PowerShell > right-click > Run as Administrator) and enter this command:

dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

To update to WSL 2, you must be running Windows 10...

For x64 systems: Version 1903 or later, with Build 18362.1049 or later.
For ARM64 systems: Version 2004 or later, with Build 19041 or later.
or Windows 11.

Builds lower than 18362 do not support WSL 2.

### Step 2- Enable Hyper-V and Virtual Machine Platform on Windows
Go to Control Panel > Program > Program and Features.
Click Turn Windows features on or off. The Windows Features window is displayed.

Enable Hyper-V and Virtual Machine Platform features.

Also check your BIOS settings and enable CPU virtualization.

### Step 3- Download the Linux kernel update package
The Linux kernel update package installs the most recent version of the WSL 2 Linux kernel for running WSL inside the Windows operating system image. (https://learn.microsoft.com/en-us/windows/wsl/install-manual)

Download the latest package.
Run the update package downloaded in the previous step.

Once the installation is complete, move on to the next step - setting WSL 2 as your default version when installing new Linux distributions. 

### Step 4 - Set WSL 2 as your default version

Open PowerShell and run this command to set WSL 2 as the default version when installing a new Linux distribution:

wsl --set-default-version 2

### Step 5- Install your Linux distribution of choice
Open the Microsoft Store and select your favorite Linux distribution.

The first time you launch a newly installed Linux distribution, a console window will open and you'll be asked to wait for a minute or two for files to de-compress and be stored on your PC. All future launches should take less than a second.

You will then need to create a user account and password for your new Linux distribution.

CONGRATULATIONS! You've successfully installed and set up a Linux distribution that is completely integrated with your Windows operating system!


# Developing in WSL from VSCode

The Visual Studio Code WSL extension lets you use the Windows Subsystem for Linux (WSL) as your full-time development environment right from VS Code.
You can develop in a Linux-based environment, use Linux-specific toolchains and utilities, and run and debug your Linux-based applications all from the comfort of Windows.

The extension runs commands and other extensions directly in WSL so you can edit files located in WSL or the mounted Windows filesystem (for example /mnt/c) without worrying about pathing issues, binary compatibility, or other cross-OS challenges.

## Installation
To get started, you need to:
+ Install the Windows Subsystem for Linux along with your preferred Linux distribution.
+ Install Visual Studio Code on the **Windows** side (not in WSL).
Note: When prompted to Select Additional Tasks during installation, be sure to check the Add to PATH option so you can easily open a folder in WSL using the code command.
+ Install the WSL extension.


### Open a remote folder or workspace from the WSL terminal
Opening a folder inside the Windows Subsystem for Linux in VS Code is very similar to opening up a Windows folder from the command prompt or PowerShell.

Open a WSL terminal window (using the start menu item or by typing wsl from a command prompt / PowerShell).

Navigate to a folder you'd like to open in VS Code (including, but not limited to, Windows filesystem mounts like /mnt/c)

Type **code .** in the terminal. When doing this for the first time, you should see VS Code fetching components needed to run in WSL. This should only take a short while, and is only needed once.

Note: If this command does not work, you may need to restart your terminal or you may not have added VS Code to your path when it was installed.

After a moment, a new VS Code window will appear, and you'll see a notification that VS Code is opening the folder in WSL.

VS Code will now continue to configure itself in WSL and keep you up to date as it makes progress.

Once finished, you now see a WSL indicator in the bottom left corner, and you'll be able to use VS Code as you would normally!

#### Managing extensions

VS Code runs extensions in one of two places: locally on the UI / client side, or in WSL. While extensions that affect the VS Code UI, like themes and snippets, are installed locally, most extensions will reside inside WSL.

If you install an extension from the Extensions view, it will automatically be installed in the correct location. Once installed, you can tell where an extension is installed based on the category grouping. There will be Local - Installed category and one for WSL.

#### Opening a terminal in WSL

Opening a terminal in WSL from VS Code is simple. Once folder is opened in WSL, any terminal window you open in VS Code (Terminal > New Terminal) will automatically run in WSL rather than locally.

You can also use the code command line from this same terminal window to perform a number of operations such as opening a new file or folder in WSL. Type code --help to see what options are available from the command line.



# Set up your SSH Key Configuration
Using the SSH protocol, you can connect and authenticate to remote servers and services. With SSH keys, you can connect to GitHub without supplying your username and personal access token at each visit. You can also use an SSH key to sign commits.

You can access and write data in repositories on GitHub.com using SSH (Secure Shell Protocol). When you connect via SSH, you authenticate using a private key file on your local machine. 

When you set up SSH, you will need to generate a new private SSH key and add it to the SSH agent. You must also add the public SSH key to your account on GitHub before you use the key to authenticate or sign commits.

ssh-agent is a program that runs in the background and keeps your key loaded into memory, so that you don't need to enter your passphrase every time you need to use the key. 

## Checking for existing SSH keys

Before you generate an SSH key, you can check to see if you have any existing SSH keys.

Before you generate a new SSH key, you should check your local machine for existing keys.

Open Git Bash.
Enter `ls -al ~/.ssh` to see if existing SSH keys are present.

Tip: If you receive an error that ~/.ssh doesn't exist, you do not have an existing SSH key pair in the default location. You can create a new SSH key pair in the next step.

## Generating a new SSH key and adding it to the ssh-agent

After you've checked for existing SSH keys, you can generate a new SSH key to use for authentication, then add it to the ssh-agent.

You can access and write data in repositories on GitHub.com using SSH (Secure Shell Protocol). When you connect via SSH, you authenticate using a private key file on your local machine. 
You can generate a new SSH key on your local machine. After you generate the key, you can add the public key to your account on GitHub.com to enable authentication for Git operations over SSH.

Open Git Bash.

Paste the text below, replacing the email used in the example with your GitHub email address.
`ssh-keygen -t ed25519 -C "your_email@example.com"`

This creates a new SSH key, using the provided email as a label.

When you're prompted to "Enter a file in which to save the key", you can press Enter to accept the default file location.

At the prompt, type a secure passphrase. 

### Adding your SSH key to the ssh-agent

Before adding a new SSH key to the ssh-agent to manage your keys, you should have checked for existing SSH keys and generated a new SSH key.
Start the ssh-agent in the background.

`$ eval "$(ssh-agent -s)"`

Add your SSH private key to the ssh-agent.

If you created your key with a different name, or if you are adding an existing key that has a different name, replace id_ed25519 in the command with the name of your private key file.

`ssh-add ~/.ssh/id_ed25519`

## Add the SSH public key to your account on GitHub. 

After you generate an SSH key pair, you must add the public key to GitHub.com to enable SSH access for your account.

You can add an SSH key and use it for authentication, or commit signing, or both. If you want to use the same SSH key for both authentication and signing, you need to upload it twice.

Copy the SSH public key to your clipboard.
You can locate the hidden .ssh folder, open the file in your favorite text editor, and copy it to your clipboard.

Add the copied SSH key to your account on Github.

## Test your SSH connection

After you've set up your SSH key and added it to your account on GitHub.com, you can test your connection.

When you test your connection, you'll need to authenticate this action using your password, which is the SSH key passphrase you created earlier. 

Open Terminal.

Enter the following:
`ssh -T git@github.com`
You may see a warning like this:
```bash
> The authenticity of host "github.com (IP ADDRESS)" cant be established.
> ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
> Are you sure you want to continue connecting (yes/no)?
```

Verify that the fingerprint in the message you see matches GitHub's public key fingerprint. If it does, then type yes:
```bash
> Hi USERNAME! You've successfully authenticated, but GitHub does not
> provide shell access.
```

You can now use SSH to access github repos.
Download your remote repos on Github to Local directory of your choice in WSL.

# Install nvm, node.js, and npm on Windows Subsystem for Linux (WSL2)
First, run `sudo apt update && sudo apt upgrade -y`.

Besides choosing whether to install on Windows or WSL, there are additional choices to make when installing Node.js. We recommend using a version manager as versions change very quickly. You will likely need to switch between multiple versions of Node.js based on the needs of different projects you're working on. Node Version Manager, more commonly called nvm, is the most popular way to install multiple versions of Node.js. We will walk through the steps to install nvm and then use it to install Node.js and Node Package Manager (npm).

+ Open your Ubuntu command line (or distribution of your choice).

+ Install cURL (a tool used for downloading content from the internet in the command-line) with: `sudo apt-get install curl`.

+ Install nvm, with: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash`.

+ To verify installation, enter: `command -v nvm` ...this should return 'nvm', if you receive 'command not found' or no response at all, close your current terminal, reopen it, and try again.

+ List which versions of Node are currently installed (should be none at this point): `nvm ls`.

+ Install the current stable LTS release of Node.js (recommended for production applications): `nvm install --lts`.

+ List what versions of Node are installed: `nvm ls` ...now you should see the version that you just installed listed.

+ When you used nvm to update Node.js, it also updated npm to the latest version that corresponds to the installed Node.js version.

+ Verify that Node.js is installed and the currently default version with: `node --version`. Then verify that you have npm as well, with: `npm --version` (You can also use which node or which npm to see the path used for the default versions).

# Configure VSCODE Extensions

VSCode Plugins to install:

+ ESLint
+ Prettier-Code Formatter
+ Atom One Dark Theme (font: Fira Mono Medium. Add the font to Windows Fonts.)
+ Material Icon Theme
+ Live Server

# Configure Remote WSL: Ubuntu `settings.json` file
Copy the content of stored `settings.json` file in .vscodeignore, to the **Remote the WSL: Ubuntu** `settings.json` file.

# IMPORTANT
The "automatic upgrade" part of the Store app is more than a bit confusing. Yes, "Ubuntu" (without a version number) in the Store "automatically updates", but that probably doesn't mean what you think it means. It took me a bit to get used to this concept myself.

This is a bit difficult to explain, but when you install "Ubuntu" (no version) from the Store, you actually end up with three different "installations":

+ WSL itself, of course, as a prerequisite. This is actually where the Linux kernel is installed, since it is shared between all installed WSL2 distributions/instances.
+ An "app package" with a rootfs package (install.tar.gz) in C:\Program Files\WindowsApps\CanonicalGroup.... You can see this by starting an Administrative PowerShell and running Get-ChildItem -Recurse 'C:\Program Files\WindowsApps\Canonical*' | Where-Object {$_.Name -eq 'install.tar.gz' }.
+ When run for the first time (via ubuntu.exe), the installer creates your actual WSL instance in your %UserProfile%\AppData\Local\Packages\CanonicalGroup....

### What does an "automatic upgrade" of the Store app really do?
When there's a new update of the app on the Store, the only thing that gets updated on your system is the **rootfs** package. It does not change your installed instance. It does not automatically update any of the packages in your instance. It does not even update the WSL2 kernel.

You still need to run **`sudo apt update && sudo apt upgrade -y`** (or equivalent) to update the packages on a regular basis. Note that this does not include the kernel -- See below for how to do that.

### Upgrading the kernel
Note that neither the Store update nor apt (or other package methods) update the WSL2 kernel. Since the kernel is part of WSL2 itself, and shared between all of the installed distributions, it's handled differently. Use:

`wsl --update`

... to check for and download any WSL2 kernel update.