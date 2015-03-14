# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network "private_network", ip: "192.168.33.62"
  config.vm.synced_folder ".", "/mnt/johnny-five"
  config.ssh.forward_agent = true
  config.hostsupdater.aliases = [
    "johnny-five.loc"
  ]
  config.vm.provision "ansible" do |ansible|
    ansible.limit = "vagrant"
    ansible.inventory_path = "deploy/ansible/inventory/development"
    ansible.playbook = "deploy/ansible/provision.yml"
  end
end
